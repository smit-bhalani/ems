import { leaveData, totalLeave } from "../mock_data/leaveData"

export const calculateLeaveBalance = (id) => {
    return totalLeave - leaveData.filter(u => u.userId == id).reduce((acc, data) => acc + data.totalDays, 0);
}

export const calculatePendingLeaves = (id) => {
     return leaveData.filter(u => (u.userId === id && u.status === "pending")).length
}