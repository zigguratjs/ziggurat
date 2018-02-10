import {MemoryCollection} from '../../src/collections/memory';
import {Document} from '../../src/models/document';
import {expect} from 'chai';
import 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

describe('MemoryCollection', () => {
  let col = new MemoryCollection();

  it('should initially return 0 for count()', () => {
    expect(col.count()).to.eventually.equal(0);
  });
  it('should initially return empty list for find()', () => {
    expect(col.find()).to.eventually.eql([]);
  });
});
