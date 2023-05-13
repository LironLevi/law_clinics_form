import Layout from "../components/layout";
import { SessionProvider } from "next-auth/react"

// We import our CSS here because Next.js takes care of rendering it for us
import "../styles.css";
import { StateMachineProvider } from 'little-state-machine'

export default function App({ 
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <StateMachineProvider>
          <Component {...pageProps} />
        </StateMachineProvider>
      </Layout>
    </SessionProvider>
  );
}
