library(htmltools)
library(dplyr)

myTag <- div(class = "parent", "contents of div")
otherTag <- span("contents of span")
myTag <- tagAppendChild(myTag, otherTag)

myTag


str_label <- "483,292"
div_row <- div(class = "div_row")
div_chart <- div(class = "div_chart")
div_bar <- div(class = "div_bar")
div_text <- div(class = "mark_text", str_label)

# append TWO child elements to div chart
nde_chart <- tagAppendChild(div_chart, div_bar) %>% tagAppendChild(div_text)

nde_row <- tagAppendChild(div_row, nde_chart)

nde_row






myTag





tagList(tags$h1("Title"),
       tags$h2("Header text"),
       tags$p("Text here"))



# Can also convert a regular list to a tagList (internal data structure isn't
# exactly the same, but when rendered to HTML, the output is the same).
x <- list(tags$h1("Title"),
          tags$h2("Header text"),
          tags$p("Text here"))

tagList(x)

# suppress the whitespace between tags
oneline <- tag("span",
               tag("strong", "Super strong", .noWS="outside")
)
cat(as.character(oneline))