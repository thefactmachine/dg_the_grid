library(xml2)

x <- read_xml("<foo> <bar> text <baz/> </bar> </foo>")
x

xml_name(x)
xml_children(x)
xml_text(x)
xml_find_all(x, ".//baz")

# type of xmlnode
xml_svg_test <- read_xml("/Users/markthekoala/Documents/ato_pre_employment/venn_reconile_new.svg")

# 3 key classes:
# 1) xml_node; 2) xml_doc 3) xml_nodeset

# add_child
# add_sibling

# ?xml2::xml_add_sibling()

# https://www.r-bloggers.com/2016/07/xml2-1-0-0/

root <- xml_new_document() %>% xml_add_child("root")
root %>% 
  xml_add_child("a1", x = "1", y = "2") %>% 
  xml_add_child("b") %>% 
  xml_add_child("c") 


# %>% invisible()


root %>% 
  xml_add_child("a2") %>% 
  xml_add_sibling("a3") %>% 
  invisible()
cat(as.character(root))




  