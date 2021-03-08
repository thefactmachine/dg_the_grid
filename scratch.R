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


int_num_elements <- 4
vct_digits <- runif(int_num_elements, min = 7, max = 55) %>% round(digits = 0)
str_title <- "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"
vct_z <- sapply(vct_digits, function(x) substr(str_title, 1, x))

vct_variable <- vct_z  %>% rep(times = int_num_elements)
vct_value <- runif(int_num_elements ^ 2, min = 1, max = 100) %>% round(digits = 0)
df_hm_data <- data.frame(group = vct_variable, 
                         variable = vct_variable, value = vct_value)
lst_data <- list(data = df_hm_data, group = vct_z, variable =  vct_z)







int_num_elements <- 30

vct_str_length <- sample(7:55, int_num_elements, replace = TRUE)
vct_z <- stri_rand_strings(int_num_elements, vct_str_length) 
vct_z[1] <- "mark the koala climbs up trees"


(vct_z %>% unique() %>% length()) == int_num_elements


df_hm_data %>% select(from, to, value) %>% filter(to == "jtnxehcfzhsucghcdzzdxoklscirivfmh") %>% View()






df_hm_data %>% select(from, to, value) %>% filter(from == "mark the koala climbs up trees") 






