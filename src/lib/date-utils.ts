import dayjs from "dayjs";

export function formatDateMMMDDYYYY(isoString: string) {
    return dayjs(isoString).format("MMM DD YYYY");
}
