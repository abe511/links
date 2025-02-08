
### An app which shows all unique combinations of links between entities
---
#### Installation

*on MacOS/Linux:*  

run `make`

*on Windows:*  

run `docker compose up`

*see other commands in the Makefile*

---

#### Usage

open `localhost:3000`

enter some numbers  
ex:  
`Items: 1,2,3` \
`Length: 2`


or send a POST request to `localhost:3000/generate`:
```json
{
	"items": [1,2,3],
	"length": 2
}
```
