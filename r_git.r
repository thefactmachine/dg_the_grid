
setwd("/Users/markthekoala/Documents/d3_examples/r_markdown_examples")

library(git2r)
library(dplyr)

lst_commits <- git2r::commits() 

# get the first commit
first_commit <- lst_commits[[length(lst_commits)]]
last_commit


last_commit <- lst_commits[1]
last_commit

# its a list but only has one element
last_commit %>% class()


git2r::last_commit()$sha


