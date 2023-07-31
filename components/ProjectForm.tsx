"use client";
import { ProjectInterface, SessionInterface } from "@/common.types";
import { ChangeEvent } from "react";
import Image from "next/image";
import FormField from "./FormField";
import { categoryFilters } from "@/constant";

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

const ProjectForm = ({ type, session }: Props) => {
  const handleFormSubmit = (e: React.FormEvent) => {};
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};
  const handleStateChange = (fieldName: string, value: string) => {};
  const form = {
    image: "",
    title: "",
    description: "",
    githubUrl: "",
    linkedInUrl: "",
    liveSiteUrl: "",
    category: "",
  };
  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          className="form_image-input"
          id="image"
          type="file"
          accept="image/*"
          required={type === "create" ? true : false}
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="Project poster"
            fill
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Project Title"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Description"
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="Project URL"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField
        type="url"
        title="Github URL"
        state={form.githubUrl}
        placeholder="Github URL"
        setState={(value) => handleStateChange("githubUrl", value)}
      />
      <FormField
        type="url"
        title="LinkIned URL"
        state={form.linkedInUrl}
        placeholder="Github URL"
        setState={(value) => handleStateChange("linkedInUrl", value)}
      />
      {/* CustomInput Category  */}
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <button type="button" className="">
          Create
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
