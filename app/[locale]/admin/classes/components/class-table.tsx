import React from "react";
import ImageElement from "@/components/global/image-element";
import { Class } from "@/types/class.types";

const ClassTable = ({
  classes,
  locale,
  onEdit,
  onDelete,
}: {
  classes: Class[];
  locale: string;
  onEdit: (classData: Class) => void;
  onDelete: (classData: Class) => void;
}) => (
  <table className="w-full text-left border border-gray-200">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-2 border">Image</th>
        <th className="p-2 border">Name</th>
        <th className="p-2 border">Description</th>
        <th className="p-2 border">Position</th>
        <th className="p-2 border">Actions</th>
      </tr>
    </thead>
    <tbody>
      {classes.map((classData) => (
        <tr key={classData.id} className="border">
          <td className="p-2">
            {classData.image ? (
              <ImageElement
                height={400}
                width={400}
                imageUrl={classData.image}
                alt={classData.name[locale]}
                className="w-14 h-14 object-cover rounded"
                showSkeleton={false}
              />
            ) : (
              <span className="text-gray-300 italic">No image</span>
            )}
          </td>
          <td className="p-2 font-medium">{classData.name[locale]}</td>
          <td className="p-2 text-sm text-gray-600 max-w-xs truncate">
            {classData.description[locale]}
          </td>
          <td className="p-2 text-center">{classData.position}</td>
          <td className="p-2 space-x-2">
            <button
              className="text-blue-600 hover:underline"
              onClick={() => onEdit(classData)}
            >
              Edit
            </button>
            <button
              className="text-red-600 hover:underline"
              onClick={() => onDelete(classData)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
      {classes.length === 0 && (
        <tr>
          <td colSpan={5} className="p-4 text-center text-gray-400">
            No classes available
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export default ClassTable;
