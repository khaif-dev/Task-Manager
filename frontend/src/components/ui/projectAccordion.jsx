import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { fetchProjects, editProject, deleteProject, defaultProject } from "@/lib/APIs/projectAPI";
import { Link } from "react-router-dom";
import { Plus, Trash2, SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectAccordion = ({ refresh }) => {
  const [projects, setProjects] = useState([]);

  // Load projects
  const refreshProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data.message);
      if (refresh) refresh();
    } catch (error) {
      console.error("Unable to refresh projects", error);
    }
  };


  useEffect(() => {
    const loadProjects = async () => {
      try {
        await defaultProject();
        await refreshProjects();
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };
    loadProjects();
  }, []);

  // Delete project
  const handleDelete = async (project) => {
    try {
      await deleteProject(project._id);
      refreshProjects();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Edit project (open modal)
  const handleEdit = (project) => {
    window.dispatchEvent(
      new CustomEvent("openEditProjectModal", { detail: { project } })
    );
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="projects">
        <AccordionTrigger>My Projects</AccordionTrigger>

        <AccordionContent>
          <div className="flex flex-col gap-2 mt-2">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project._id}
                  className="flex justify-between bg-gray-100 rounded px-2 py-1"
                >
                  <Link
                    to={`/projects/${project._id}`}
                    className="hover:text-blue-600"
                  >
                    {project.title}
                  </Link>

                  <div className="flex gap-1">
                    <Button
                      className="p-1"
                      variant="ghost"
                      onClick={() => handleDelete(project)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>

                    <Button
                      className="p-1"
                      variant="ghost"
                      onClick={() => handleEdit(project)}
                    >
                      <SquarePen className="h-4 w-4 text-green-600" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No projects yet</p>
            )}
          </div>

          <Button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("openAddProjectModal"))
            }
            className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Plus /> Create New Project
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProjectAccordion;
