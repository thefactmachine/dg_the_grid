df_data <- iris[c(1, 55, 119, 34), ]
names(df_data) <- c("s_length", "s_width", "p_width", "p_width", "species")
df_data$s_length <- df_data$s_length / max(df_data$s_length)

library(dplyr)

vct_group <- c("A", "B", "C", "D") %>% rep(times = 4)
vct_variable <- c("V1", "V2", "V3", "v4") %>% rep(each = 4)
vct_val <- c(56, 20, 90, 23, 95, 83, 45, 78, 7, 67, 32, 67, 43, 74, 22, 86)
df_hm_data <- data.frame(group = vct_group, 
          variable = vct_variable, value = vct_val)




vct_group <- c("A", "B", "C", "E") %>% rep(times = 4)
vct_variable <- c("V1", "V2", "V3", "v4") %>% rep(each = 4)
vct_val <- c(56, 20, 90, 23, 95, 83, 45, 78, 7, 67, 32, 67, 43, 74, 22, 86)
df_hm_data <- data.frame(group = vct_group, 
                         variable = vct_variable, value = vct_val)

# so the variables seem as though they are just displayed in the order they
# are presented.
df_hm_data <- df_hm_data %>% arrange(desc(group))

lst_data <- list(data = df_hm_data, group = c("A", "B", "C", "E"), 
     variable =  c("V1", "V2", "V3", "v4"))