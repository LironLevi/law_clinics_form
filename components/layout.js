export default function Layout({ children }) {
  
  return (
    <div className="outer">
      <main className="container">{children}</main>
    </div>
);
}
