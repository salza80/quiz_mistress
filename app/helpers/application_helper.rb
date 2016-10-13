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
    image_tag(image.image_file.url, opts)
  end


end
