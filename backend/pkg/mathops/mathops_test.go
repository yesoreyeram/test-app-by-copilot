package mathops

import (
	"testing"
)

func TestAdd(t *testing.T) {
	tests := []struct {
		a, b     float64
		expected float64
	}{
		{2, 3, 5},
		{-1, 1, 0},
		{0, 0, 0},
	}

	for _, tt := range tests {
		result := Add(tt.a, tt.b)
		if result != tt.expected {
			t.Errorf("Add(%f, %f) = %f; want %f", tt.a, tt.b, result, tt.expected)
		}
	}
}

func TestSubtract(t *testing.T) {
	tests := []struct {
		a, b     float64
		expected float64
	}{
		{5, 3, 2},
		{0, 5, -5},
		{10, 10, 0},
	}

	for _, tt := range tests {
		result := Subtract(tt.a, tt.b)
		if result != tt.expected {
			t.Errorf("Subtract(%f, %f) = %f; want %f", tt.a, tt.b, result, tt.expected)
		}
	}
}

func TestMultiply(t *testing.T) {
	tests := []struct {
		a, b     float64
		expected float64
	}{
		{2, 3, 6},
		{-2, 3, -6},
		{0, 100, 0},
	}

	for _, tt := range tests {
		result := Multiply(tt.a, tt.b)
		if result != tt.expected {
			t.Errorf("Multiply(%f, %f) = %f; want %f", tt.a, tt.b, result, tt.expected)
		}
	}
}

func TestDivide(t *testing.T) {
	tests := []struct {
		a, b      float64
		expected  float64
		shouldErr bool
	}{
		{6, 2, 3, false},
		{5, 2, 2.5, false},
		{10, 0, 0, true},
	}

	for _, tt := range tests {
		result, err := Divide(tt.a, tt.b)
		if tt.shouldErr {
			if err == nil {
				t.Errorf("Divide(%f, %f) should return error", tt.a, tt.b)
			}
		} else {
			if err != nil {
				t.Errorf("Divide(%f, %f) returned unexpected error: %v", tt.a, tt.b, err)
			}
			if result != tt.expected {
				t.Errorf("Divide(%f, %f) = %f; want %f", tt.a, tt.b, result, tt.expected)
			}
		}
	}
}
