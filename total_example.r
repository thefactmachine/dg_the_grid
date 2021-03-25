library(dplyr)
library(htmltools)

data <- MASS::Cars93[18:28, ] %>%
  select(Manufacturer, Model, Type, Sales = Price)

reactable(
  data,
  defaultPageSize = 11,
  columns = list(
    Manufacturer = colDef(footer = "Total"),
    Sales = colDef(footer = function(values) sprintf("$%.2f", sum(values)))
  ),
  defaultColDef = colDef(footerStyle = list(fontWeight = "bold"))
)