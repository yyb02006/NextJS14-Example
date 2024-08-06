import ClientComponentFetch from './FetchingFromClient'
import ServerComponentFetch from './FetchingFromServer'

export default async function RouteHandlerRequestPage() {
  return (
    <section>
      <h1>Hello RouteHandlerRequestPage!</h1>
      <div>
        Client = <ClientComponentFetch />
      </div>
      <div>
        Server = <ServerComponentFetch />
      </div>
    </section>
  )
}
