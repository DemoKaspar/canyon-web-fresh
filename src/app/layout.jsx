import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://canyon.tech"),
  title: { default: "Canyon | Enterprise AI Production Platform", template: "%s | Canyon" },
  description: "Certified data. Governed access. Deployed to your infrastructure. Canyon is the enterprise data layer for AI-built software.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Canyon",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        {process.env.NEXT_PUBLIC_HUBSPOT_ID && (
          <script
            id="hs-script-loader"
            async
            defer
            src={`//js.hs-scripts.com/${process.env.NEXT_PUBLIC_HUBSPOT_ID}.js`}
          />
        )}
      </head>
      <body style={{ margin: 0, background: "#0D0D0F" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Canyon",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Cloud",
              description: "Enterprise AI Production Platform. Certified data. Governed access. Deployed to your infrastructure.",
              url: "https://canyon.tech",
              author: {
                "@type": "Organization",
                name: "PlatCo Group",
                url: "https://canyon.tech",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
