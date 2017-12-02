 class ResultEncoder
  attr_reader :decoded, :encoded

  def initialize(initValue)
   setValue(initValue)
  end

  def setValue(initValue)
    isInt = Integer(initValue) rescue false
    if isInt
      @decoded = Integer(initValue)
      @encoded = encode(initValue)
    else
      @decoded= decode(initValue)
      @encoded = initValue
    end  
  end

  private

  def encode(value)
    Base64.urlsafe_encode64(value.to_s)
  end

  def decode(value)
    Integer(Base64.urlsafe_decode64(value))
  end
end
