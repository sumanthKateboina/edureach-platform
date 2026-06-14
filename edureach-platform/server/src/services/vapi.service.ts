interface CallPayload {
  phoneNumber: string;
  userName: string;
  userEmail: string;
  preferredCourse?: string;
  queryTopic?: string;
}

interface VapiCallResponse {
  id: string | null;
  status: string;
  fallback?: boolean;
  message?: string;
  [key: string]: unknown;
}

export class VapiCallError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, code = "VAPI_CALL_FAILED", statusCode = 502) {
    super(message);
    this.name = "VapiCallError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

const normalizePhoneNumber = (phoneNumber: string): string => {
  const compactPhone = phoneNumber.replace(/[\s()-]/g, "");

  if (/^\+[1-9]\d{7,14}$/.test(compactPhone)) {
    return compactPhone;
  }

  if (/^[6-9]\d{9}$/.test(compactPhone)) {
    return `+91${compactPhone}`;
  }

  throw new VapiCallError(
    "Enter a valid phone number with country code, for example +919876543210.",
    "INVALID_PHONE",
    400,
  );
};

const canUseCurrentVapiNumber = (formattedPhone: string): boolean => {
  if (process.env.VAPI_ALLOW_INTERNATIONAL_CALLS === "true") {
    return true;
  }

  const allowedPrefixes = (process.env.VAPI_ALLOWED_COUNTRY_CODES || "+1")
    .split(",")
    .map((prefix) => prefix.trim())
    .filter(Boolean);

  return allowedPrefixes.some((prefix) => formattedPhone.startsWith(prefix));
};

const callbackFallback = (): VapiCallResponse => ({
  id: null,
  status: "manual_callback_required",
  fallback: true,
  message: "Your callback request was received. Our admissions team will contact you from the college line.",
});

export const initiateOutboundCall = async (payload: CallPayload): Promise<VapiCallResponse> => {
  const { phoneNumber, userName, userEmail, preferredCourse, queryTopic } = payload;

  const VAPI_API_KEY = process.env.VAPI_API_KEY;
  const VAPI_PHONE_NUMBER_ID = process.env.VAPI_PHONE_NUMBER_ID;
  const VAPI_ASSISTANT_ID = process.env.VAPI_ASSISTANT_ID;

  if (!VAPI_API_KEY || !VAPI_PHONE_NUMBER_ID || !VAPI_ASSISTANT_ID) {
    throw new VapiCallError(
      "Voice calling is not configured yet. Please contact admissions directly.",
      "VAPI_CONFIG_MISSING",
      503,
    );
  }

  const formattedPhone = normalizePhoneNumber(phoneNumber);

  if (!canUseCurrentVapiNumber(formattedPhone)) {
    return callbackFallback();
  }

  const response = await fetch("https://api.vapi.ai/call", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${VAPI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assistantId: VAPI_ASSISTANT_ID,
      assistantOverrides: {
        firstMessage: `Hi ${userName}, this is Ava from EduReach College. I'm calling to help you with information about ${preferredCourse || "our programs"}. Do you have a quick moment?`,
        variableValues: {
          studentName: userName,
          studentEmail: userEmail,
          preferredCourse: preferredCourse || "Not specified",
          queryTopic: queryTopic || "General inquiry",
        },
      },
      phoneNumberId: VAPI_PHONE_NUMBER_ID,
      customer: {
        number: formattedPhone,
        name: userName,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Vapi API Error:", errorData);

    const providerMessage = typeof errorData?.message === "string" ? errorData.message : "";
    if (providerMessage.toLowerCase().includes("international calls")) {
      return callbackFallback();
    }

    throw new VapiCallError(
      "We could not start the voice call right now. Please retry in a moment.",
      "VAPI_PROVIDER_ERROR",
      response.status,
    );
  }

  const data = (await response.json()) as VapiCallResponse;
  return data;
};
