import { AddCMLInterface, CMLInterface } from "../interface/cml";

const apiURL = "http://localhost:5000";

export async function GetCMLByLineNumber(
  lineNumber: string
): Promise<{ status: boolean; data: CMLInterface[] | null; message: string }> {
  try {
    const response = await fetch(`${apiURL}/api/cml/${lineNumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (response.status === 200) {
      return {
        status: true,
        data: result,
        message: "Data fetched successfully",
      };
    } else {
      return { status: false, data: null, message: "Data not found" };
    }
  } catch (error: any) {
    return {
      status: false,
      data: null,
      message: error.message || "Internal Server Error",
    };
  }
}

export async function AddCML(data: AddCMLInterface): Promise<{
  status: boolean;
  message: string;
}> {
  try {
    const response = await fetch(`${apiURL}/api/cml`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.status === 201) {
      return { status: true, message: "CML added successfully" };
    } else if (response.status === 400) {
      return { status: false, message: result.message || "Bad Request" };
    } else {
      throw new Error(result.message || "Unexpected Error");
    }
  } catch (error: any) {
    return { status: false, message: error.message || "Internal Server Error" };
  }
}

export async function UpdateCML(
  lineNumber: string,
  cmlNumber: number,
  data: AddCMLInterface
): Promise<{ status: boolean; message: string }> {
  try {
    const response = await fetch(
      `${apiURL}/api/cml/${lineNumber}/${cmlNumber}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (response.status === 200) {
      return { status: true, message: "CML updated successfully" };
    } else if (response.status === 404) {
      return { status: false, message: "CML not found" };
    } else {
      throw new Error(result.message || "Failed to update CML");
    }
  } catch (error: any) {
    return { status: false, message: error.message || "Internal Server Error" };
  }
}

export async function DeleteCML(
  lineNumber: string,
  cmlNumber: number
): Promise<{ status: boolean; message: string }> {
  try {
    const response = await fetch(
      `${apiURL}/api/cml/${lineNumber}/${cmlNumber}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return { status: true, message: "CML deleted successfully" };
    } else if (response.status === 404) {
      return { status: false, message: "CML not found" };
    } else {
      throw new Error("Failed to delete CML");
    }
  } catch (error: any) {
    return { status: false, message: error.message || "Internal Server Error" };
  }
}
