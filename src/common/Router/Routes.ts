import Loadable from "react-loadable";
import {Loading} from "../FondueComponents/Layout/Loading";

export const AsyncHomePage = Loadable({
    loader: () => import("../Views/Home"),
    loading: Loading,
    modules: ['../Views/Home'],

});
export const AsyncAboutPage = Loadable({
    loader: () => import("../Views/About"),
    loading: Loading,
    modules: ['../Views/About'],

});
export const AsyncNotFoundPage = Loadable({
    loader: () => import("../Views/NotFound"),
    loading: Loading,
    modules: ['../Views/NotFound'],

});
export const AsyncChatsPage = Loadable({
    loader: () => import("../Views/Chats"),
    loading: Loading,
    modules: ['../Views/Chats'],

});



