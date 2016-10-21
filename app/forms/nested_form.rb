module NestedForm
  extend ActiveSupport::Concern

  included do
    property :id,       writeable: false
    property :_destroy, virtual: true
  end

  def new_record?
    model.new_record?
  end

  def marked_for_destruction?
    model.marked_for_destruction?
  end
end
