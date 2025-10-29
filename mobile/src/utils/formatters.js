/**
 * Formata CPF: 123.456.789-01
 */
export const formatCPF = (cpf) => {
  const cleaned = cpf.replace(/[^\d]/g, '');
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

/**
 * Formata CNPJ: 12.345.678/0001-90
 */
export const formatCNPJ = (cnpj) => {
  const cleaned = cnpj.replace(/[^\d]/g, '');
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

/**
 * Formata CPF ou CNPJ automaticamente
 */
export const formatCPForCNPJ = (value) => {
  const cleaned = value.replace(/[^\d]/g, '');
  
  if (cleaned.length <= 11) {
    return formatCPF(cleaned);
  }
  return formatCNPJ(cleaned);
};

/**
 * Formata telefone: (47) 99999-9999
 */
export const formatPhone = (phone) => {
  const cleaned = phone.replace(/[^\d]/g, '');
  
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
};

/**
 * Formata CEP: 12345-678
 */
export const formatCEP = (cep) => {
  const cleaned = cep.replace(/[^\d]/g, '');
  return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
};

/**
 * Formata moeda brasileira: R$ 1.234,56
 */
export const formatCurrency = (value) => {
  const number = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(number)) return 'R$ 0,00';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number);
};

/**
 * Formata data: DD/MM/YYYY
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  return `${day}/${month}/${year}`;
};

/**
 * Formata data e hora: DD/MM/YYYY HH:MM
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

/**
 * Trunca texto com reticências
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
