import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const CreateProject = async () => {
  const session = await getCurrentUser();

  //    if not logged in, redirect to home page
  if (!session?.user) redirect("/");

  return (
    <Modal>
      <h3 className="modal-head-text">Create Project</h3>
      <ProjectForm type="create" session={session} />
    </Modal>
  );
};

export default CreateProject;
