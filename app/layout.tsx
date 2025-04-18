export const metadata = {
  title: 'HookAgent',
  description: 'GPT-powered hook analyzer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
