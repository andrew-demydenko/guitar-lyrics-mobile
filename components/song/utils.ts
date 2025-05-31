import { CHORDS } from "@/constants/Chords";
import { ChordPositions } from "@/entities/song";

// Проверяет, является ли строка служебной информацией
export const isServiceLine = (text: string): boolean => {
  if (!text) return false;
  const trimmedText = text.trim();
  if (!trimmedText) return false;

  // Разделители - всегда служебные строки, независимо от отступов
  const separatorPatterns = [
    /^[-—–=]{3,}$/, // Дефисы и тире
    /^[_.]{3,}$/, // Точки и подчеркивания
    /^[*]{3,}$/, // Звездочки
    /^[=]{3,}$/, // Знаки равенства
    /^[^a-zа-яё\d]*$/i, // Строки только из символов-разделителей
  ];

  // Сначала проверяем на разделители
  if (separatorPatterns.some((pattern) => pattern.test(trimmedText))) {
    return true;
  }

  // Проверяем, что строка начинается с пробелов или табуляции
  const leadingSpaces = text.match(/^[\s\t]*/)?.[0]?.length || 0;
  const isIndented = leadingSpaces > 0;

  // Если строка с отступом, это может быть часть текста песни
  if (isIndented) {
    return false;
  }

  const serviceLinePatterns = [
    // Заголовки частей песни - должны быть в начале строки и могут содержать номер
    // Например: "Куплет 1", "Припев:", "CHORUS", "Verse 2"
    /^(?:куплет|припев|бридж|кода|инструментал|проигрыш|вступление|outro|intro|verse|chorus|bridge|coda)[\s:]?\d*$/i,

    // Метаданные - должны быть в начале строки и заканчиваться двоеточием
    /^(?:автор|текст|музыка|composer|lyrics by|music by):.*$/i,

    // Повторы - должны быть в скобках и содержать только цифру или 'x' и опционально слово "раза"/"раз"
    /^\([x\d](?:\s?(?:раза?))?\)$/i,

    // Копирайты - должны быть в начале строки
    /^[©℗®]/,
  ];

  // Проверяем на соответствие шаблонам
  const isService = serviceLinePatterns.some((pattern) => {
    const match = pattern.test(trimmedText);
    // Дополнительная проверка для заголовков частей песни
    if (match && pattern.source.includes("куплет|припев")) {
      // Проверяем, что это действительно заголовок, а не часть текста
      // Заголовок должен быть короче 25 символов и не содержать знаков препинания кроме : и цифр
      return trimmedText.length < 25 && !/[,.!?;]/.test(trimmedText);
    }
    return match;
  });

  return isService;
};

// Проверяет, содержит ли строка аккорды
export const isChordsLine = (text: string): boolean => {
  if (!text) return false;
  const parts = text.split(/\s+/);
  return parts.some((part) => CHORDS.includes(part));
};

// Проверяет, является ли строка риффом с аккордами
export const isChordsRiff = (text: string): boolean => {
  if (!text) return false;
  const trimmedText = text.trim();
  if (!trimmedText.startsWith("|")) return false;

  const parts = trimmedText.slice(1).trim().split(/\s+/);
  return parts.every((part) => CHORDS.includes(part));
};

// Проверяет, не является ли строка текстом песни
export const isNotLyricLine = (text: string): boolean => {
  return isServiceLine(text) || isChordsLine(text) || isChordsRiff(text);
};

// Проверяет валидность расстояния между аккордами
export const isDistanceValid = (
  line: string,
  charIndex: number,
  chordPositions: ChordPositions
): boolean => {
  return !chordPositions.some((chord) => {
    const [existingCharIndex, , existingLine] = chord;
    return existingLine === line && Math.abs(existingCharIndex - charIndex) < 6;
  });
};

// Добавляет дополнительные пробелы для повторяющихся строк
export const addExtraSpaceOnRepeat = (lines: string[]): string[] => {
  const seenLines = new Map();

  return lines.map((line) => {
    if (seenLines.has(line)) {
      const repeatCount = seenLines.get(line);
      seenLines.set(line, repeatCount + 1);
      return line + " ".repeat(repeatCount);
    } else {
      seenLines.set(line, 1);
      return line;
    }
  });
};
