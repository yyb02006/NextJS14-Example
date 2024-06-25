import ClientComponentFetch from './FetchingFromClient'
import ServerComponentFetch from './FetchingFromServer'

export default async function RouteHandlerRequestPage() {
  return (
    <section>
      Hello RouteHandlerRequestPage!
      <div>
        Client = <ClientComponentFetch />
      </div>
      <div>
        Server = <ServerComponentFetch />
      </div>
    </section>
  )
}
