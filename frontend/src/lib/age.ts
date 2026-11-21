export function calculateAge(
  birthDate: string,
  today: Date = new Date(),
): number {
  const birth = new Date(birthDate);
  const hadBirthdayThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate());

  return (
    today.getFullYear() - birth.getFullYear() - (hadBirthdayThisYear ? 0 : 1)
  );
}
