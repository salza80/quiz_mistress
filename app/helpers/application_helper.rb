module ApplicationHelper

def img_reference(image)
  return unless image
  return unless image.ref_url
  # s = %span.img-ref
  l =  link_to(image.ref_title, image.ref_url, target: "_blank", rel: "nofollow")
  content_tag(:span, l, class:'img-ref')
end



end
