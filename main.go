package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"regexp"
	"strings"

	"github.com/dslipak/pdf"
)

type Question struct {
	Head    string   `json:"head"`
	Options []string `json:"options"`
}

func main() {
	files, _ := os.ReadDir("./pdfs")
	for _, fileDir := range files {
		_, _ = os.OpenFile("./pdfs"+fileDir.Name(), os.O_RDONLY, 0755)
		reader, err := pdf.Open("./pdfs/" + fileDir.Name())
		if err != nil {
			log.Fatal(err)
		}
		read, _ := reader.GetPlainText()
		content, _ := io.ReadAll(read)
		text := string(content)
		re := regexp.MustCompile(`\d{1,2}\)|\d+\.`)
		indices := re.FindAllStringIndex(text, -1)
		var questions []string
		for i, idx := range indices {
			start := idx[0]
			var end int
			if i < len(indices)-1 {
				end = indices[i+1][0]
			} else {
				end = len(text)
			}
			question := strings.TrimSpace(text[start:end])
			questions = append(questions, question)
		}

		splitRe := regexp.MustCompile(`[:?]`)
		optionRe := regexp.MustCompile(`([a-d]\))`)

		var parsedQuestions []Question
		for _, question := range questions {
			parts := splitRe.Split(question, 2)
			if strings.Contains(fileDir.Name(), "SIMULADOS Normas") {
				fmt.Println(parts)
			}
			if len(parts) == 2 {
				head := parts[0]
				optionsPart := parts[1]
				optionIndices := optionRe.FindAllStringIndex(optionsPart, -1)
				var options []string
				for i, idx := range optionIndices {
					start := idx[0]
					var end int
					if i < len(optionIndices)-1 {
						end = optionIndices[i+1][0]
					} else {
						end = len(optionsPart)
					}
					options = append(options, strings.TrimSpace(optionsPart[start:end]))
				}

				parsedQuestions = append(parsedQuestions, Question{Head: head, Options: options})
			}
			if len(parts) == 1 {

			}
		}

		questionsJson, _ := json.Marshal(parsedQuestions)
		fileName := strings.Split(fileDir.Name(), ".pdf")[0]
		filePath := "./jsons/" + fileName + ".json"
		err = os.WriteFile(filePath, questionsJson, 0755)
		fmt.Println(filePath)
	}
}
