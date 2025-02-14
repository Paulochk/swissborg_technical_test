export function formatDateDDMMMYYYY(isoString: string, userLocale: string = navigator.language) {
    return new Intl.DateTimeFormat(userLocale, {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(new Date(isoString));
}