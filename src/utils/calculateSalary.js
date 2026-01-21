export const PROFESSIONAL_TAX = 200;
const PF_PERCENTAGE = 5;
const INCOME_TAX = 10;

export const calculatePF = (salary) => (salary * PF_PERCENTAGE) / 100;
export const calculateIT = (salary) => (salary * INCOME_TAX) / 100;
export const calculateDeduction = (salary) => (calculatePF(salary) + calculateIT(salary) + PROFESSIONAL_TAX);
export const calculateNP = (salary) => (salary - calculateDeduction(salary));