// import { useState } from "react";
import { Suspense, lazy } from "react";

import { Routes, Route } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const NotFound = lazy(() => import("./pages/notfound"));
const Articles = lazy(() => import("./pages/articles"));
const ArticleDetail = lazy(() => import("./pages/articles/detail"));
const ArticleCreate = lazy(() => import("./pages/articles/create"));
const Faq = lazy(() => import("./pages/faq"));

const Favorites = lazy(() => import("./pages/favorites"));
const Setting = lazy(() => import("./pages/setting"));

import { ROUTER } from "./constant/router";
function App() {
  return (
    <Suspense
      fallback={
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      }
    >
      <Routes>
        <Route path={ROUTER.HOME} element={<Home />} />
        <Route path={ROUTER.ABOUT} element={<About />} />
        {/* <Route path="/faq" element={<Home />} />

        <Route path="/favorites" element={<Home />} /> */}

        <Route path={ROUTER.ARTICLES} element={<Articles />} />
        <Route path={ROUTER.ARTICLE_CREATE} element={<ArticleCreate />} />
        <Route path={ROUTER.ARTICLES + "/:id"} element={<ArticleDetail />} />

        <Route path={ROUTER.FAV} element={<Favorites />} />
        <Route path={ROUTER.FAQ} element={<Faq />} />

        <Route path={ROUTER.SETTING} element={<Setting />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
