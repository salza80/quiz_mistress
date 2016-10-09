module ApplicationHelper

def img_reference(image)
  return unless image
  return unless image.ref_url
  l =  link_to(image.ref_title, image.ref_url, target: "_blank", rel: "nofollow")
  content_tag(:span, "Image source: ".html_safe + l, class:'img-ref')
end



end
