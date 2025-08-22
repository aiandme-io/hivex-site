import { useEffect, useState } from "react";
import ProjectsList from "./ProjectsList";
import ProjectDetail from "./ProjectDetail";
import Leaderboard from "./Leaderboard";

type Route = "home" | "project" | "leaderboard";

export default function App() {
  const [route, setRoute] = useState<Route>("home");
  const [projectSlug, setProjectSlug] = useState<string>("");

  useEffect(() => {
    // Handle browser navigation
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === "/") {
        setRoute("home");
        setProjectSlug("");
      } else if (path.startsWith("/p/")) {
        const slug = path.replace("/p/", "");
        setRoute("project");
        setProjectSlug(slug);
      } else if (path === "/leaderboard") {
        setRoute("leaderboard");
        setProjectSlug("");
      }
      updateNavigationActiveState();
    };

    // Initial route setup
    handlePopState();

    // Set up navigation click handlers
    const navProjects = document.getElementById("nav-projects");
    const navLeaderboard = document.getElementById("nav-leaderboard");
    
    if (navProjects) {
      navProjects.addEventListener("click", (e) => {
        e.preventDefault();
        navigate("home");
      });
    }
    
    if (navLeaderboard) {
      navLeaderboard.addEventListener("click", (e) => {
        e.preventDefault();
        navigate("leaderboard");
      });
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const updateNavigationActiveState = () => {
    const navProjects = document.getElementById("nav-projects");
    const navLeaderboard = document.getElementById("nav-leaderboard");
    
    if (navProjects) {
      navProjects.className = route === "home" ? "text-blue-600 hover:text-gray-900" : "text-gray-600 hover:text-gray-900";
    }
    
    if (navLeaderboard) {
      navLeaderboard.className = route === "leaderboard" ? "text-blue-600 hover:text-gray-900" : "text-gray-600 hover:text-gray-900";
    }
  };

  const navigate = (newRoute: Route, slug?: string) => {
    setRoute(newRoute);
    if (slug) setProjectSlug(slug);
    
    let path = "/";
    if (newRoute === "project" && slug) {
      path = `/p/${slug}`;
    } else if (newRoute === "leaderboard") {
      path = "/leaderboard";
    }
    
    window.history.pushState({}, "", path);
    updateNavigationActiveState();
  };

  if (route === "home") {
    return <ProjectsList onProjectClick={(slug) => navigate("project", slug)} />;
  }

  if (route === "project") {
    return (
      <div className="space-y-6">
        <button onClick={() => navigate("home")} className="underline">
          &larr; Back to Projects
        </button>
        <ProjectDetail slug={projectSlug} />
      </div>
    );
  }

  if (route === "leaderboard") {
    return (
      <div className="space-y-6">
        <button onClick={() => navigate("home")} className="underline">
          &larr; Back to Projects
        </button>
        <Leaderboard />
      </div>
    );
  }

  return null;
}
