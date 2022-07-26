import IRoute from "../interfaces/route";
import Blog from "../pages/blog";
import EditPage from "../pages/edit";
import HomePage from "../pages/home";
import Login from "../pages/login";

const authRoutes: IRoute[] = [
  {
    path: "/login",
    exact: true,
    auth: false,
    component: Login,
    name: "Login",
  },
  {
    path: "/register",
    exact: true,
    auth: false,
    component: Login,
    name: "register",
  },
  {
    path: "/edit",
    exact: true,
    auth: true,
    component: EditPage,
    name: "Edit",
  },
  {
    path: "/edit/:blogID",
    exact: true,
    auth: true,
    component: EditPage,
    name: "Edit",
  },
  {
    path: "/blogs/:blogID",
    exact: true,
    auth: false,
    component: Blog,
    name: "Blog",
  },
  {
    path: "/",
    exact: true,
    auth: false,
    component: HomePage,
    name: "Home",
  },
];
const blogRoutes: IRoute[] = [];
const mainRoutes: IRoute[] = [];
const routes: IRoute[] = [...authRoutes, ...blogRoutes, ...mainRoutes];

export default routes;
