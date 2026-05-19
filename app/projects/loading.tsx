export default function Loading() {
  return (
    <main className="min-h-[calc(100vh-81px)] bg-[#0f0f0f] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#d45a00] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <p className="text-gray-400 tracking-wide">Loading projects...</p>
      </div>
    </main>
  );
}