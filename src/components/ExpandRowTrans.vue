<template>
  <div>
    <Row class="expand-row">
      <Col>
        <span class="expand-key">File Name: </span>
        <span class="expand-value">{{ row.itemName }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col>
        <span class="expand-key">Category: </span>
        <span class="expand-value">{{ row.category }}</span>
      </Col>
    </Row>
    <Row>
      <Col>
        <span class="expand-key">File Location: </span>
        <span class="expand-value">{{ row.location }}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'ExpandRowTrans',
  props: {
    row: Object
  }
}
</script>

<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
