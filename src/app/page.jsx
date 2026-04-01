export const metadata = {
  title: "Canyon | Enterprise AI Production Platform",
  description: "Certified data. Governed access. Deployed to your infrastructure. Canyon is the enterprise data layer for AI-built software.",
  openGraph: {
    title: "Canyon | Enterprise AI Production Platform", 
    description: "Certified data. Governed access. Deployed to your infrastructure. Canyon is the enterprise data layer for AI-built software.",
  },
};

export default function Page() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Outfit, Arial, sans-serif',
      background: '#0D0D0F',
      color: 'white',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#60a5fa', fontSize: '3rem', marginBottom: '1rem' }}>
        Canyon Web
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Enterprise AI Production Platform - Now Working! 🎉
      </p>
      
      <div style={{ background: '#1a1a1a', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
        <h2 style={{ color: '#10b981', marginBottom: '1rem' }}>✅ Deployment Successful</h2>
        <p>The Next.js app is now properly deployed and working on Vercel.</p>
        <p><strong>Test completed at:</strong> {new Date().toISOString()}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px' }}>
          <h3>🤖 Agent Orchestration</h3>
          <p>Intelligent agent management</p>
        </div>
        <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px' }}>
          <h3>📊 Semantic Data Layer</h3>
          <p>Unified data access</p>
        </div>
        <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px' }}>
          <h3>🚀 Deployment Engine</h3>
          <p>Your infrastructure, automated</p>
        </div>
      </div>
      
      <div style={{ marginTop: '3rem', fontSize: '0.9rem', opacity: 0.7 }}>
        <p>🔒 Search engine indexing disabled during development</p>
        <p>Ready to add back the full interactive demo component</p>
      </div>
    </div>
  );
}
