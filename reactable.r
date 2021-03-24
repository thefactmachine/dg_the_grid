

library(reactable)
library(dplyr)

data <- read.csv("https://glin.github.io/reactable/articles/twitter-followers/twitter_followers.csv",
                 stringsAsFactors = FALSE)

dplyr::glimpse(data)

# three column df: "account", "followers" , "exclusive_followers_pct"



reactable(
  data,
  defaultSorted = "exclusive_followers_pct",
  columns = list(
    account = colDef(
      name = "Account",
      format = colFormat(prefix = "@")
    ),
    followers = colDef(
      name = "Followers",
      defaultSortOrder = "desc",
      format = colFormat(separators = TRUE)
    ),
    exclusive_followers_pct = colDef(
      name = "Exclusive Followers",
      defaultSortOrder = "desc",
      format = colFormat(percent = TRUE, digits = 1)
    )
  )
)


library(htmltools)

# Render a bar chart with a label on the left
bar_chart <- function(label, width = "100%", height = "14px", fill = "#00bfc4", background = NULL) {
  bar <- div(style = list(background = fill, width = width, height = height))
  chart <- div(style = list(flexGrow = 1, marginLeft = "6px", background = background), bar)
  div(style = list(display = "flex", alignItems = "center"), label, chart)
}


reactable(
  data,
  defaultSorted = "exclusive_followers_pct",
  columns = list(
    account = colDef(
      name = "Account",
      format = colFormat(prefix = "@")
    ),
    followers = colDef(
      name = "Followers",
      defaultSortOrder = "desc",
      # Render the bar charts using a custom cell render function
      cell = function(value) {
        width <- paste0(value * 100 / max(data$followers), "%")
        # Add thousands separators
        value <- format(value, big.mark = ",")
        bar_chart(value, width = width, fill = "#3fc1c9")
      },
      # And left-align the columns
      align = "left"
    ),
    exclusive_followers_pct = colDef(
      name = "Exclusive Followers",
      defaultSortOrder = "desc",
      # Render the bar charts using a custom cell render function
      cell = function(value) {
        # Format as percentages with 1 decimal place
        value <- paste0(format(value * 100, nsmall = 1), "%")
        bar_chart(value, width = value, fill = "#fc5185", background = "#e1e1e1")
      },
      # And left-align the columns
      align = "left"
    )
  )
)


library(dplyr)
library(htmltools)

data <- MASS::Cars93[18:47, ] %>%
  select(Manufacturer, Model, Type, Sales = Price)

# cols: Manufacturer, Model, Type, Sales

reactable(
  data,
  defaultPageSize = 5,
  columns = list(
    # adds "Total" underneath Manufacturer
    Manufacturer = colDef(footer = "Total"),
    Sales = colDef(footer = function(values) sprintf("$%.2f", sum(values)))
  ),
  defaultColDef = colDef(footerStyle = list(fontWeight = "bold"))
)



setwd("/Users/zurich/Documents/dg_the_grid")
df_data_flat <- read.csv("sector_data_flat.csv")
names(df_data_flat) <- c("code", "sector", "difference", "percent_diff")

df_add <- data.frame(code = "Z", sector = "Other", difference = -1671, percent_diff = -.402)
df_data_flat <- rbind(df_data_flat, df_add)


int_actual_total <- -3264579
df_data_flat$difference %>% sum() == int_actual_total



rct_cd_code <- reactable::colDef(name = "Code")
rct_cd_sector <- reactable::colDef(name = "Sector")

rct_comma_fmt <- reactable::colFormat(separators = TRUE)
rct_cd_diff <- reactable::colDef(name = "Difference", format = rct_comma_fmt)

rct_pc_fmt <- reactable::colFormat(percent = TRUE, digits = 1)
rct_cd_pc_diff <- reactable::colDef(name = "% Difference", format = rct_pc_fmt)


reactable(
  df_data_flat,
  defaultPageSize = nrow(df_data_flat),
  defaultSorted = "code",
  columns = list( 
    code = rct_cd_code,
    sector = rct_cd_sector,
    difference = rct_cd_diff,
    percent_diff = rct_cd_pc_diff
  ) # list
)



# these are in position order
columns = list(
  account = colDef(
    name = "Account",
    format = colFormat(prefix = "@")
  ),
  followers = colDef(
    name = "Followers",
    defaultSortOrder = "desc",
    format = colFormat(separators = TRUE)
  ),
  exclusive_followers_pct = colDef(
    name = "Exclusive Followers",
    defaultSortOrder = "desc",
    format = colFormat(percent = TRUE, digits = 1)
  )
)








data <- read.csv("https://glin.github.io/reactable/articles/twitter-followers/twitter_followers.csv",
                 stringsAsFactors = FALSE)


reactable(
  data,
  # default sort 
  defaultSorted = "exclusive_followers_pct",
  
  # these are in position order
  columns = list(
    account = colDef(
      name = "Account",
      format = colFormat(prefix = "@")
    ),
    followers = colDef(
      name = "Followers",
      defaultSortOrder = "desc",
      format = colFormat(separators = TRUE)
    ),
    exclusive_followers_pct = colDef(
      name = "Exclusive Followers",
      defaultSortOrder = "desc",
      format = colFormat(percent = TRUE, digits = 1)
    )
  )
)

















