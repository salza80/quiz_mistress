 class HashEncoder
  attr_reader :decoded, :encoded

  def initialize(initValue)
   setValue(initValue)
  end

  def setValue(initValue)
    isHash = initValue.respond_to?(:each)
    if isHash
      @decoded = initValue
      @encoded = encode(initValue)
    else
      @decoded= decode(initValue)
      @encoded = initValue
    end  
  end

  private

  def encode(value)
    Base64.urlsafe_encode64(value.inspect)
  end

  def decode(value)
    eval(Base64.urlsafe_decode64(value))
  end
end
