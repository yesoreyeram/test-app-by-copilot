package textconv

import (
	"strings"
	"unicode"
)

// ToLowerCase converts text to lowercase
func ToLowerCase(input string) string {
	return strings.ToLower(input)
}

// ToUpperCase converts text to uppercase
func ToUpperCase(input string) string {
	return strings.ToUpper(input)
}

// ToCamelCase converts text to camelCase
func ToCamelCase(input string) string {
	if input == "" {
		return ""
	}

	words := strings.Fields(input)
	if len(words) == 0 {
		return ""
	}

	result := strings.ToLower(words[0])
	for i := 1; i < len(words); i++ {
		if words[i] != "" {
			result += strings.ToUpper(string(words[i][0])) + strings.ToLower(words[i][1:])
		}
	}
	return result
}

// ToTitleCase converts text to Title Case
func ToTitleCase(input string) string {
	return strings.Title(strings.ToLower(input))
}

// ToInverseCase inverts the case of each character
func ToInverseCase(input string) string {
	runes := []rune(input)
	for i, r := range runes {
		if unicode.IsUpper(r) {
			runes[i] = unicode.ToLower(r)
		} else if unicode.IsLower(r) {
			runes[i] = unicode.ToUpper(r)
		}
	}
	return string(runes)
}

// ReverseText reverses the text
func ReverseText(input string) string {
	runes := []rune(input)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}
