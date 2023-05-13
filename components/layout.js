// This is our base page layout - See it is used in pages_app.js

export default function Layout({ children }) {
  
  return (
    <div className="outer">
      <main className="container">{children}</main>
    </div>
);
}
