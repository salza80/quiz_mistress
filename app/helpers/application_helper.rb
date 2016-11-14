module ApplicationHelper

  def default_meta_tags
  {
    title:       'Quiz Mistress',
    description: 'Entertainment from the Mistress',
    keywords:    'Quizzes, Quiz, Trivia, Fun',
    separator:   "&mdash;".html_safe,
    og: {
      title: "Quiz Mistress",
      type: "article",
      url: request.base_url,
      description: "Quizzes just for fun!",
      image: request.base_url + "/assets/images/" + "quiz_mistress.jpg"
    },
    viewport:"width=device-width, initial-scale=1, shrink-to-fit=no",
    charset: "utf-8",
  }
  end

  def img_reference(image)
    return unless image
    return unless image.ref_url
    l =  link_to(image.ref_title, image.ref_url, target: "_blank", rel: "nofollow")
    content_tag(:span, "Image source: ".html_safe + l, class:'img-ref')
  end

  def image_full(image, opts={})
    return unless image
    opts[:class] = "img-fluid" unless opts[:class]
    opts[:alt] =image.title unless opts[:class]
    image_tag(image.image_file.url, opts)
  end

  def modal_alert(opts={}, &block)
    opts[:id] = "modal" unless opts[:id]
    opts[:title] = "" unless opts[:title]
    content = capture(&block)  
    content_tag(:div, class: ["modal", "fade"], id: opts[:id], "aria-hidden": "true", "aria-labelledby": "myModalLabel", role: "dialog", tabindex: "-1"  ) do
      content_tag(:div,class: "modal-dialog", role:"document") do
        content_tag(:div, class:"modal-content") do
          content_tag(:div, class:"modal-header") do
            content_tag(:button, class:"close","aria-label": "Close", "data-dismiss": "modal", type: "button") do
              content_tag(:span, "x", "aria-hidden": "true" )
            end +
            content_tag(:h4, opts[:title], class:"modal-title", id: "myModalLabel" )
          end +
          content_tag(:div, content, class:"modal-body")  +
          content_tag(:div, class:"modal-footer") do
            content_tag(:button,"Close", class: "btn btn-secondary", "data-dismiss": "modal", type: "button")
          end
        end
      end
    end
  end
end
