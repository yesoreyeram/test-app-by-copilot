package mathops

import (
	"errors"
)

var (
	ErrDivisionByZero = errors.New("can't divide by zero")
)

// Add adds two numbers
func Add(a, b float64) float64 {
	return a + b
}

// Subtract subtracts b from a
func Subtract(a, b float64) float64 {
	return a - b
}

// Multiply multiplies two numbers
func Multiply(a, b float64) float64 {
	return a * b
}

// Divide divides a by b
func Divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, ErrDivisionByZero
	}
	return a / b, nil
}
