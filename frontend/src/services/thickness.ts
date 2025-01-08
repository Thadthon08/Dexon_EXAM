import { ThicknessInterface } from "../interface/thickness";

const apiURL = "http://localhost:5000";

// ดึงข้อมูล Thickness ตาม Line Number, CML Number และ TP Number
export async function GetThicknessByLineCMLAndTPNumber(
  lineNumber: string,
  cmlNumber: number,
  tpNumber: number
): Promise<{
  status: boolean;
  data: ThicknessInterface[] | null;
  message: string;
}> {
  try {
    const response = await fetch(
      `${apiURL}/api/thickness/${lineNumber}/${cmlNumber}/${tpNumber}`,
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

// // ลบข้อมูล Thickness
// export async function DeleteThickness(
//   lineNumber: string,
//   cmlNumber: number,
//   tpNumber: number,
//   inspectionDate: string
// ): Promise<{ status: boolean; message: string }> {
//   try {
//     const response = await fetch(
//       `${apiURL}/api/thickness/${lineNumber}/${cmlNumber}/${tpNumber}/${inspectionDate}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.status === 200) {
//       return { status: true, message: "Thickness deleted successfully" };
//     } else {
//       return { status: false, message: "Thickness data not found" };
//     }
//   } catch (error: any) {
//     return { status: false, message: error.message || "Internal Server Error" };
//   }
// }

// ลบข้อมูล Thickness โดยใช้ id
export async function DeleteThickness(
  id: number
): Promise<{ status: boolean; message: string }> {
  try {
    const response = await fetch(`${apiURL}/api/thickness/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return { status: true, message: "Thickness deleted successfully" };
    } else {
      return { status: false, message: "Thickness data not found" };
    }
  } catch (error: any) {
    return { status: false, message: error.message || "Internal Server Error" };
  }
}

export async function AddThickness(
  data: ThicknessInterface
): Promise<{ status: boolean; message: string }> {
  try {
    const response = await fetch(`${apiURL}/api/thickness`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      return { status: true, message: "Thickness added successfully" };
    } else {
      return { status: false, message: "Failed to add Thickness" };
    }
  } catch (error: any) {
    return { status: false, message: error.message || "Internal Server Error" };
  }
}

export async function UpdateThickness(
  id: number,
  data: Partial<ThicknessInterface>
): Promise<{ status: boolean; message: string }> {
  try {
    const response = await fetch(`${apiURL}/api/thickness/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      return { status: true, message: "Thickness updated successfully" };
    } else {
      return { status: false, message: "Failed to update Thickness" };
    }
  } catch (error: any) {
    return { status: false, message: error.message || "Internal Server Error" };
  }
}

export async function GetThicknessById(id: number): Promise<{
  status: boolean;
  data: ThicknessInterface | null;
  message: string;
}> {
  try {
    const response = await fetch(`${apiURL}/api/thickness/${id}`, {
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
        message: "Thickness fetched successfully",
      };
    } else {
      return { status: false, data: null, message: "Thickness not found" };
    }
  } catch (error: any) {
    return {
      status: false,
      data: null,
      message: error.message || "Internal Server Error",
    };
  }
}
