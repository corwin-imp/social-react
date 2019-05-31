import * as Routes from './Routes'
const routes = [
    {
        path: "/en",
        exact: true,
        component: Routes.AsyncHomePage
    },
    {
        path: "/en/about",
        exact: true,
        component: Routes.AsyncAboutPage
    },
    {

        component: Routes.AsyncNotFoundPage
    },
    {
        path: "/en/chats",
        exact: true,
        component: Routes.AsyncChatsPage
    }


];

export default routes
