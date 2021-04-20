setwd("/Users/zurich/Documents/dg_the_grid")

library(dplyr)
library(openxlsx)

# start, end, val [361 x 3]
df_data <- read.xlsx("data.xlsx", sheet = 1)

# top_level,  name
df_lu <- read.xlsx("data.xlsx", sheet = 3)


df_data_groom <- df_data %>% 
  inner_join(df_lu, by = c("start" = "top_level")) %>%
  rename(start_name = Name) %>% 
  inner_join(df_lu, by = c("end" = "top_level")) %>% 
  rename(end_name = Name)
  
saveRDS(df_data_groom, "data_groom.rds")

