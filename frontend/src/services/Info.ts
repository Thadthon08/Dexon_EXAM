import { InfoInterface } from "../interface/Info";

const apiURL = "http://localhost:5000";

export async function AddInfo(data: InfoInterface) {
  try {
    const response = await fetch(`${apiURL}/api/info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.status === 201) {
      return { status: true, message: "Info added successfully" };
    } else if (response.status === 400) {
      return { status: false, message: result.message || "Bad Request" };
    } else {
      throw new Error(result.message || "Unexpected Error");
    }
  } catch (error: any) {
    return { status: false, message: error.message || "Internal Server Error" };
  }
}

export async function GetInfo(): Promise<{
  status: boolean;
  data: InfoInterface[] | null;
  message: string;
}> {
  try {
    const response = await fetch(`${apiURL}/api/info`, {
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
      throw new Error(result.message || "Failed to fetch data");
    }
  } catch (error: any) {
    return {
      status: false,
      data: null,
      message: error.message || "Internal Server Error",
    };
  }
}

export async function GetInfoByLineNumber(lineNumber: string): Promise<{
  status: boolean;
  data: InfoInterface | null;
  message: string;
}> {
  try {
    const response = await fetch(`${apiURL}/api/info/${lineNumber}`, {
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
    } else if (response.status === 404) {
      return {
        status: false,
        data: null,
        message: "Data not found",
      };
    } else {
      throw new Error(result.message || "Failed to fetch data");
    }
  } catch (error: any) {
    return {
      status: false,
      data: null,
      message: error.message || "Internal Server Error",
    };
  }
}

export async function UpdateInfo(
  lineNumber: string,
  data: InfoInterface
): Promise<{
  status: boolean;
  message: string;
}> {
  try {
    const response = await fetch(`${apiURL}/api/info/${lineNumber}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.status === 200) {
      return {
        status: true,
        message: "Info updated successfully",
      };
    } else if (response.status === 404) {
      return {
        status: false,
        message: "Data not found",
      };
    } else {
      throw new Error(result.message || "Failed to update data");
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.message || "Internal Server Error",
    };
  }
}

export async function DeleteInfo(lineNumber: string): Promise<{
  status: boolean;
  message: string;
}> {
  try {
    const response = await fetch(`${apiURL}/api/info/${lineNumber}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (response.status === 200) {
      return { status: true, message: "Info deleted successfully" };
    } else if (response.status === 404) {
      return { status: false, message: "Data not found" };
    } else {
      throw new Error(result.message || "Failed to delete data");
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.message || "Internal Server Error",
    };
  }
}
