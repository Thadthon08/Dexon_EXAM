import { ThicknessInterface } from "../interface/thickness";
import { TPInterface } from "../interface/tp";

const apiURL = "http://localhost:5000";

export async function GetTPByLineAndCMLNumber(
  lineNumber: string,
  cmlNumber: number
): Promise<{ status: boolean; data: TPInterface[] | null; message: string }> {
  try {
    const response = await fetch(
      `${apiURL}/api/test-point/${lineNumber}/${cmlNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (response.status === 200) {
      return {
        status: true,
        data: result,
        message: "Test Points fetched successfully",
      };
    } else {
      return { status: false, data: null, message: "Test Points not found" };
    }
  } catch (error: any) {
    return {
      status: false,
      data: null,
      message: error.message || "Internal Server Error",
    };
  }
}

export async function AddTP(
  data: TPInterface
): Promise<{ status: boolean; message: string }> {
  try {
    const response = await fetch(`${apiURL}/api/test-point`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.status === 201) {
      return { status: true, message: "Test Point added successfully" };
    } else if (response.status === 400) {
      return { status: false, message: result.message || "Bad Request" };
    } else {
      throw new Error(result.message || "Unexpected Error");
    }
  } catch (error: any) {
    return { status: false, message: error.message || "Internal Server Error" };
  }
}

export async function UpdateTP(
  lineNumber: string,
  cmlNumber: number,
  tpNumber: number,
  data: Partial<TPInterface>
): Promise<{ status: boolean; message: string }> {
  try {
    const response = await fetch(
      `${apiURL}/api/test-point/${lineNumber}/${cmlNumber}/${tpNumber}`,
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
      return { status: true, message: "Test Point updated successfully" };
    } else if (response.status === 404) {
      return { status: false, message: "Test Point not found" };
    } else {
      throw new Error(result.message || "Failed to update Test Point");
    }
  } catch (error: any) {
    return { status: false, message: error.message || "Internal Server Error" };
  }
}

export async function DeleteTP(
  lineNumber: string,
  cmlNumber: number,
  tpNumber: number
): Promise<{ status: boolean; message: string }> {
  try {
    const response = await fetch(
      `${apiURL}/api/test-point/${lineNumber}/${cmlNumber}/${tpNumber}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return { status: true, message: "Test Point deleted successfully" };
    } else if (response.status === 404) {
      return { status: false, message: "Test Point not found" };
    } else {
      throw new Error("Failed to delete Test Point");
    }
  } catch (error: any) {
    return { status: false, message: error.message || "Internal Server Error" };
  }
}
