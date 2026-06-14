import { useMemo, useState } from "react";
import { BarChart3, KeyRound, Loader2, LogOut, Search, Users } from "lucide-react";
import { toast } from "react-hot-toast";
import { getAdmissions, type Admission, type AdmissionsSummary } from "../services/admin.service.ts";

const storedAdminKey = () => localStorage.getItem("adminKey") || "";

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState(storedAdminKey);
  const [keyInput, setKeyInput] = useState(storedAdminKey);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<AdmissionsSummary | null>(null);
  const [query, setQuery] = useState("");

  const loadAdmissions = async (key = adminKey) => {
    if (!key.trim()) {
      toast.error("Enter the admin key.");
      return;
    }

    setLoading(true);
    try {
      const data = await getAdmissions(key.trim());
      localStorage.setItem("adminKey", key.trim());
      setAdminKey(key.trim());
      setSummary(data);
      toast.success("Admissions loaded.");
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Unable to load admissions.");
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  const filteredAdmissions = useMemo(() => {
    const admissions = summary?.admissions || [];
    const needle = query.trim().toLowerCase();
    if (!needle) return admissions;

    return admissions.filter((admission: Admission) =>
      [admission.name, admission.email, admission.phone, admission.courseInterest, admission.qualification, admission.city]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(needle)),
    );
  }, [query, summary]);

  const courseEntries = Object.entries(summary?.courseCounts || {}).sort((a, b) => b[1] - a[1]);

  return (
    <main className="min-h-screen bg-gray-50 font-body text-gray-900">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <a href="/" className="text-xs font-bold uppercase tracking-wider text-maroon">
              EduReach
            </a>
            <h1 className="font-heading text-3xl font-bold text-gray-950">Admissions Admin</h1>
          </div>

          {adminKey && (
            <button
              onClick={() => {
                localStorage.removeItem("adminKey");
                setAdminKey("");
                setKeyInput("");
                setSummary(null);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4" />
              Clear Key
            </button>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            loadAdmissions(keyInput);
          }}
          className="mb-8 grid gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto]"
        >
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={keyInput}
              onChange={(event) => setKeyInput(event.target.value)}
              placeholder="Admin dashboard key"
              className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm font-medium outline-none focus:border-maroon focus:ring-1 focus:ring-maroon"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-maroon px-5 py-3 text-sm font-bold text-white hover:bg-maroon-light disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Users className="h-4 w-4" />}
            Load Students
          </button>
        </form>

        {summary && (
          <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">Total Forms</span>
                  <Users className="h-5 w-5 text-maroon" />
                </div>
                <p className="mt-3 text-4xl font-bold text-gray-950">{summary.total}</p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">Course Demand</span>
                  <BarChart3 className="h-5 w-5 text-maroon" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {courseEntries.map(([course, count]) => (
                    <div key={course} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                      <span className="text-sm font-semibold text-gray-700">{course}</span>
                      <span className="rounded-full bg-maroon px-2.5 py-1 text-xs font-bold text-white">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="font-heading text-xl font-bold text-gray-950">Student Submissions</h2>
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search students"
                    className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-maroon focus:ring-1 focus:ring-maroon"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] text-left text-sm">
                  <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                    <tr>
                      <th className="px-4 py-3">Student</th>
                      <th className="px-4 py-3">Contact</th>
                      <th className="px-4 py-3">Course</th>
                      <th className="px-4 py-3">Qualification</th>
                      <th className="px-4 py-3">City</th>
                      <th className="px-4 py-3">Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredAdmissions.map((admission) => (
                      <tr key={admission._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-semibold text-gray-900">{admission.name}</td>
                        <td className="px-4 py-3 text-gray-600">
                          <div>{admission.email}</div>
                          <div className="text-xs text-gray-400">{admission.phone || "No phone"}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{admission.courseInterest || "Not specified"}</td>
                        <td className="px-4 py-3 text-gray-600">{admission.qualification || "Not specified"}</td>
                        <td className="px-4 py-3 text-gray-600">{admission.city || "Not specified"}</td>
                        <td className="px-4 py-3 text-gray-500">
                          {new Date(admission.created_at).toLocaleDateString(undefined, {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
