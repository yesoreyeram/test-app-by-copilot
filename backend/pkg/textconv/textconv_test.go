package textconv

import (
	"testing"
)

func TestToLowerCase(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{"Hello World", "hello world"},
		{"UPPERCASE", "uppercase"},
		{"", ""},
	}

	for _, tt := range tests {
		result := ToLowerCase(tt.input)
		if result != tt.expected {
			t.Errorf("ToLowerCase(%q) = %q; want %q", tt.input, result, tt.expected)
		}
	}
}

func TestToUpperCase(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{"Hello World", "HELLO WORLD"},
		{"lowercase", "LOWERCASE"},
		{"", ""},
	}

	for _, tt := range tests {
		result := ToUpperCase(tt.input)
		if result != tt.expected {
			t.Errorf("ToUpperCase(%q) = %q; want %q", tt.input, result, tt.expected)
		}
	}
}

func TestToCamelCase(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{"hello world", "helloWorld"},
		{"Hello World", "helloWorld"},
		{"", ""},
	}

	for _, tt := range tests {
		result := ToCamelCase(tt.input)
		if result != tt.expected {
			t.Errorf("ToCamelCase(%q) = %q; want %q", tt.input, result, tt.expected)
		}
	}
}

func TestToTitleCase(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{"hello world", "Hello World"},
		{"HELLO WORLD", "Hello World"},
		{"", ""},
	}

	for _, tt := range tests {
		result := ToTitleCase(tt.input)
		if result != tt.expected {
			t.Errorf("ToTitleCase(%q) = %q; want %q", tt.input, result, tt.expected)
		}
	}
}

func TestToInverseCase(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{"Hello World", "hELLO wORLD"},
		{"ABC123xyz", "abc123XYZ"},
		{"", ""},
	}

	for _, tt := range tests {
		result := ToInverseCase(tt.input)
		if result != tt.expected {
			t.Errorf("ToInverseCase(%q) = %q; want %q", tt.input, result, tt.expected)
		}
	}
}

func TestReverseText(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{"Hello World", "dlroW olleH"},
		{"12345", "54321"},
		{"", ""},
	}

	for _, tt := range tests {
		result := ReverseText(tt.input)
		if result != tt.expected {
			t.Errorf("ReverseText(%q) = %q; want %q", tt.input, result, tt.expected)
		}
	}
}
